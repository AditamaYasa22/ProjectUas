function createSuccessResponse(data) {
    return {
      status: 200,
      message: "Success",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      metadata: {
        version: "1.0",
        timestamp: new Date().toISOString(),
      },
    };
  }
  
  function createErrorResponse(statusCode, message) {
    return {
      status: statusCode,
      massage: message,
      headers: {
        "Content-Type": "application/json",
      },
      metadata: {
        version: "1.0",
        timestamp: new Date().toISOString(),
      },
    };
  }
  
  function createPostSuccessResponse(createdItem) {
    return {
      status: 201,
      message: "Resource created successfully",
      data: createdItem,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      metadata: {
        version: "1.0",
        timestamp: new Date().toISOString(),
      },
    };
  }
  
  function createPutSuccessResponse(updatedItem) {
    return {
      status: 200,
      message: 'Resource updated successfully',
      data: updatedItem,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      metadata: {
        version: '1.0',
        timestamp: new Date().toISOString()
      }
    };
  }
  
  function createDeleteSuccessResponse() {
    return {
      status: 204,
      message: 'Resource deleted successfully',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      metadata: {
        version: '1.0',
        timestamp: new Date().toISOString()
      }
    };
  }
  
  
  module.exports = {
    createPutSuccessResponse,
    createDeleteSuccessResponse,
    createPostSuccessResponse,
    createSuccessResponse,
    createErrorResponse,
  };
  