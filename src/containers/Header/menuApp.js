export const adminMenu = [
    { //quản lí người dùng
        name: 'menu.admin.manager-user',
        menus: [

            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manager-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manager-admin', link: '/system/user-admin'
            // },
            //quản lí khám bệnh bac sĩ
            {
                name: 'menu.doctor.manager-schedule', link: '/doctor/manager-schedule'
            }
            
        ]
    },

    { //quản lí Phòng khám
        name: 'menu.admin.clinic',
        menus: [
            
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },

        ]
    },
    { //quản lí Chuyên Khoa
        name: 'menu.admin.specialty',
        menus: [
            
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },

        ]
    },
    { //quản lí cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },

        ]
    }
];

export const doctorMenu = [
    {
        name: 'menu.admin.manager-user',
        menus: [
            //quản lí khám bệnh bac sĩ
            {
                name: 'menu.doctor.manager-schedule', link: '/doctor/manager-schedule'
            }
        ]
    }
    
];