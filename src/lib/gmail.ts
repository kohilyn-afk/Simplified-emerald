export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailMessagePart {
  mimeType: string;
  headers?: GmailHeader[];
  body?: {
    data?: string;
    size?: number;
  };
  parts?: GmailMessagePart[];
}

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet?: string;
  internalDate?: string;
  payload?: GmailMessagePart;
}

export interface FormattedEmail {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
}

function decodeBase64Url(input: string): string {
  try {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    return input;
  }
}

function extractBody(payload?: GmailMessagePart): string {
  if (!payload) return '';
  
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }
  
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        // Strip basic HTML tags for plain display
        const html = decodeBase64Url(part.body.data);
        return html.replace(/<[^>]*>?/gm, '');
      }
    }
  }
  return '';
}

export function parseHeaders(headers?: GmailHeader[]): { from: string; to: string; subject: string; date: string } {
  let from = '';
  let to = '';
  let subject = '(No Subject)';
  let date = '';

  if (headers) {
    for (const h of headers) {
      const name = h.name.toLowerCase();
      if (name === 'from') from = h.value;
      if (name === 'to') to = h.value;
      if (name === 'subject') subject = h.value;
      if (name === 'date') date = h.value;
    }
  }

  return { from, to, subject, date };
}

export async function fetchGmailMessages(
  accessToken: string,
  query: string = '',
  maxResults: number = 10
): Promise<FormattedEmail[]> {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  url.searchParams.set('maxResults', maxResults.toString());
  if (query) {
    url.searchParams.set('q', query);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const messagesList: { id: string; threadId: string }[] = data.messages || [];

  const emails: FormattedEmail[] = [];

  for (const item of messagesList.slice(0, maxResults)) {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=full`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (msgRes.ok) {
        const msg: GmailMessage = await msgRes.json();
        const { from, to, subject, date } = parseHeaders(msg.payload?.headers);
        const body = extractBody(msg.payload);
        emails.push({
          id: msg.id,
          threadId: msg.threadId,
          from: from || 'Unknown',
          to: to || 'me',
          subject: subject || '(No Subject)',
          date: date || (msg.internalDate ? new Date(parseInt(msg.internalDate)).toLocaleString() : ''),
          snippet: msg.snippet || '',
          body: body || msg.snippet || '',
        });
      }
    } catch (e) {
      console.error('Error fetching message details:', e);
    }
  }

  return emails;
}

export function encodeEmailRaw(to: string, subject: string, body: string): string {
  const emailLines = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ];
  const email = emailLines.join('\r\n');

  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function sendGmailMessage(
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<any> {
  const raw = encodeEmailRaw(to, subject, body);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to send email (${res.status}): ${errorText}`);
  }

  return await res.json();
}

export async function trashGmailMessage(accessToken: string, messageId: string): Promise<any> {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to trash email (${res.status}): ${errorText}`);
  }

  return await res.json();
}
