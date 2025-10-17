import { sessions } from '../utils/sessions'

export default defineEventHandler(async (event) => {
  console.log('Request Cookies:', event.node.req.headers.cookie)

  const sessionId = getCookie(event, 'sessionId')

  if (sessionId && sessions.has(sessionId)) {
    event.context.authenticated = true
    console.log('AUTH', sessionId)
  } else {
    event.context.authenticated = false
    console.log('NO-AUTH', sessionId)
  }
})