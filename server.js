import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

// GETリクエストに対する処理
app.get('/api/:name/:rank', (c) => {
  const name = c.req.param('name');
  const rank = c.req.param('rank');

  return c.json({message: 'GET', param: { name, rank } });
});

// POSTリクエストに対する処理
app.post('/api', async (c) => {
  const payload = await c.req.parseBody();
  const name = payload['name'];
  const rank = payload['rank'];
  return c.json({ message: 'POST', name, rank });
});

// PUTリクエストに対する処理
app.put('/api/:name', async (c) => {
  const name = c.req.param('name');
  const body = await c.req.json();
  //const name = body['name'];
  const rank = body.rank;
  return c.json({ message: 'PUT',json: { name, rank } });
});

// DELETEリクエストに対する処理
app.delete('/api/:name', (c) => {
  const name = c.req.param('name');
  return c.json({ message: 'DELETE' });
});

Deno.serve(app.fetch);
