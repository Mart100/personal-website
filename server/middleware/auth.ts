import { sessions } from '../utils/sessions'

export default defineEventHandler(async (event) => {

  if (event.path.startsWith('/admin') || event.path.startsWith('/api/admin')) {

    console.log('Request Cookies:', event.node.req.headers.cookie)

    const sessionId = getCookie(event, 'sessionId')

    if (sessionId && sessions.has(sessionId)) {
      event.context.authenticated = true
      console.log('AUTH', sessionId)
    } else {
      event.context.authenticated = false
      console.log('NO-AUTH', sessionId)
    }

  }

})