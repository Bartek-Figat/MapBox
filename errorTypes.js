module.exports = {
  errorTypes: {
    server: {
      statusCode: 500,
      name: "Internal Server Error",
      message: "Not Found",
    },
    validation: {
      statusCode: 400,
      name: "Bad Request",
      message: "validation error",
    },
    auth: { statusCode: 401, name: "Unauthorized", message: "auth error" },
    forbidden: {
      statusCode: 403,
      name: "Forbidden",
      message: "forbidden content",
    },
    notFound: {
      statusCode: 404,
      name: "Not Found",
      message: "content not found",
    },
    entity: {
      statusCode: 422,
      name: "Unprocessable Entity",
      message: "entity error",
    },
  },
};
