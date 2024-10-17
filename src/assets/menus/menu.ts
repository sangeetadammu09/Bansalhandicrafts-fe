export const AdminMenuList = {
    status: 200,
    data: [
        {
            id: 0,
            name: 'My Profile',
            icon : 'fa-user',
            isActive: true,
            url: 'my-profile',
            subMenus: []
        },
        {
            id: 1,
            name: 'Product List',
            icon : 'fa-chalkboard',
            isActive: true,
            url: 'product-list',
            subMenus: []
        },
        
        {
            id: 3,
            name: 'Admins List',
            icon : 'fa-user',
            isActive: true,
            url: 'admin-list',
            subMenus: []
        },
        {
            id: 4,
            name: 'Feedback List',
            icon : 'fa-pencil',
            isActive: true,
            url: 'product-feedback-list',
            subMenus: []
        },
        {
            id: 5,
            name: 'Enquiry List',
            icon : 'fa-book',
            isActive: true,
            url: 'contact-list',
            subMenus: []
        },
        // {
        //     id: 6,
        //     name: 'List of Payments',
        //     icon : 'fa-money',
        //     isActive: true,
        //     url: 'payment-list',
        //     subMenus: []
        // },       

    ],
    message: "Admin Menu fetched successfully",
};
