export const path = {
  ROOT: "/",
  SIGN: "/sign",
  HOME: "/home",
  CREATE_WORKSPACE: "/workspaces-mini-apps/create-workspace",
  CREATE_MINI_APP: "/workspaces-mini-apps/create-mini-app",
  WORKSPACES_MINI_APPS: "/workspaces-mini-apps",
  MINI_APPS: "/workspaces-mini-apps/mini-apps",
  PEOPLE: "/people",
  PEOPLE_ADD: "/people/add",
  ANNOUNCEMENTS: "/announcements",
  CREATE_ANNOUNCEMENT: "/announcements/create",
  SETTINGS: "/settings",
  WORKSPACE: "/workspace",
  MINI_APP: "/mini-app",
}

export const pathWithSlug = {
  MINI_APP_SLUG: (miniApp: string) => `${path.MINI_APPS}/${miniApp}`,
  MINI_APP_ADD_PEOPLE: (miniApp: string) => `${path.MINI_APPS}/${miniApp}/add-people`,

  // workspace
  WORKSPACE_SLUG: (workspace: string) => `${path.WORKSPACES_MINI_APPS}/${workspace}`,
  WORKSPACE_SECOND_LEVEL: (parentId: string, childId: string) => `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}`,
  WORKSPACE_THIRD_LEVEL: (parentId: string, childId: string, grandChildId: string) => `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}/${grandChildId}`,

  CREATE_WORKSPACE_LV_1: (childId: string) => `${path.WORKSPACES_MINI_APPS}/${childId}/create-workspace`,
  CREATE_WORKSPACE_LV_2: (parentId: string, childId: string) => `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}/create-workspace`,
  CREATE_WORKSPACE_LV_3: (parentId: string, childId: string, grandChildId: string) =>
    `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}/${grandChildId}/create-workspace`,

  CREATE_MINI_APP_LV_1: (childId: string) => `${path.WORKSPACES_MINI_APPS}/${childId}/create-mini-app`,
  CREATE_MINI_APP_LV_2: (parentId: string, childId: string) => `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}/create-mini-app`,
  CREATE_MINI_APP_LV_3: (parentId: string, childId: string, grandChildId: string) =>
    `${path.WORKSPACES_MINI_APPS}/${parentId}/${childId}/${grandChildId}/create-mini-app`,

  WORKSPACE_MINI_APP: (workspaceId: string, miniAppId: string) => `${path.WORKSPACE}/${workspaceId}/${path.MINI_APP}/${miniAppId}`,
}