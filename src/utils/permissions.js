export const permissions = {
  admin: {
    users: true,
    createUser: true,
    updateUserRole: true,
    disableUser: true,

    createProduct: true,
    editProduct: true,
    deleteProduct: true,

    viewInventory: true,
    stockIn: true,
    stockOut: true,

    uploadFile: true,
    downloadFile: true,

    ai: true,
   
    uploadFile: true,
    downloadFile: true,
    deleteFile: true,

  },

  manager: {
    users: true, // Manager can view users

    createUser: false,
    updateUserRole: false,
    disableUser: false,

    createProduct: true,
    editProduct: true,
    deleteProduct: false,

    viewInventory: true,
    stockIn: true,
    stockOut: true,

    uploadFile: true,
    downloadFile: true,

    ai: true,
       uploadFile: true,
    downloadFile: true,
    deleteFile: false,
  },

  viewer: {
    users: false,

    createUser: false,
    updateUserRole: false,
    disableUser: false,

    createProduct: false,
    editProduct: false,
    deleteProduct: false,

    viewInventory: true,
    stockIn: false,
    stockOut: false,

    uploadFile: false,
    downloadFile: true,

    ai: true,

        uploadFile: false,
    downloadFile: true,
    deleteFile: false,
  },
};