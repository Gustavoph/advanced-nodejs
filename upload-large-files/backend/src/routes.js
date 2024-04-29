export class Routes {
  #io

  constructor(io) {
    this.#io = io
  }

  async post(request, response) {
    const { headers } = request
    const { query: { socketId } } = url.parse(request.url, true)
    const redirectTo = headers.origin

    this.#io.to(socketId).emit('file-uploaded', 5e6)
    const onFinish = (request, response) => {
      response.writeHead(303, {
        Connection: 'close',
        Location: `${redirectTo}?msg=Files updated with success`
      })

      response.end()
    }

    return onFinish(response, headers.origin)
  }
}
