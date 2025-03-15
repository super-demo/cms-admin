export enum roleConst {
    Root = "Root",
    Developer = "Developer",
    SuperAdmin = "Super Admin",
    Admin = "Admin",
    Viewer = "Viewer",
    People = "People"
}

export type Role = roleConst.Root | roleConst.Developer | roleConst.SuperAdmin | roleConst.Admin | roleConst.Viewer | roleConst.People


export const roleList = [
    {
        id: 1,
        role: roleConst.Root
    },
    {
        id: 2,
        role: roleConst.Developer
    },
    {
        id: 3,
        role: roleConst.SuperAdmin
    },
    {
        id: 4,
        role: roleConst.Admin
    },
    {
        id: 5,
        role: roleConst.Viewer
    },
    {
        id: 6,
        role: roleConst.People
    }
]