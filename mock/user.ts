

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/user/login': {
    status:200,
    code:200,
    data:{
      message:"success",
      token:'123456'
    }
  },

  'GET /api/user/info': {
    status:200,
    code:200,
    data:{
      username:'张海玉'
    }
  }

};
