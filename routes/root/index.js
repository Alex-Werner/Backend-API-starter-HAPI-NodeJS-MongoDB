module.exports = {
  method: 'GET',
  path: '/',
  config: {
    description: 'Root endpoint redirecting to status',
    notes: 'Return',
    tags: ['api', 'status'],
    auth:false
  },
  handler: async (request, h) => {
    const res = await request.server.inject('/status');
    return res.result;
  },
};
