import { Hono } from 'hono'
import type { Env } from '@/env'
import { getGitHubCommits } from '@/stats/github/commits'
import { getGitHubProfile } from '@/stats/github/profile';
import { getGitHubStars } from '@/stats/github/stars';

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => c.json({
    code: 200,
    data: {
        message: '¡Hello, GitHub Stats API!',
        endpoints: ['/stats/github/commits', '/stats/github/profile', '/stats/github/stars']
    }
}));

app.get('/commits', async (c) => {
    const commits = await getGitHubCommits({ GH_TOKEN: c.env.GH_TOKEN });
    return c.json({
        code: 200,
        data: commits,
    })
})

app.get('/profile', async (c) => {
    const profile = await getGitHubProfile({ GH_TOKEN: c.env.GH_TOKEN });
    return c.json({
        code: 200,
        data: profile,
    })
})

app.get('/stars', async (c) => {
    const stars = await getGitHubStars({ GH_TOKEN: c.env.GH_TOKEN });
    return c.json({
        code: 200,
        data: stars,
    })
})

export default app