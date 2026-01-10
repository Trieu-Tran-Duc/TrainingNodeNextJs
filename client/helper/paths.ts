export const ROUTES_API = {

} as const;

export const ROUTES_MENU = {
    HOME: {
        path: "/",
        name: "HOME",
    },
    CONSUMPTION: {
        path: "/consumption-top",
        name: "消費",
    },
    DISPENSING: {
        path: "/dispensing-top",
        name: "払出",
    },
    TEMP_BILLING: {
        path: "/temp-billing-top",
        name: "臨時請求",
    },
    UNORDERED_MATERIAL: {
        path: "/unordered-material-top",
        name: "未発注材料入荷処理",
    },
    RETURN: {
        path: "/return-top",
        name: "返品",
    },
    ORDER: {
        path: "/order-top",
        name: "発注",
    },
    ARRIVAL: {
        path: "/arrival-top",
        name: "入荷",
    },
    INVENTORY: {
        path: "/inventory-top",
        name: "棚卸",
    },
    BID: {
        path: "/bid-top",
        name: "入札",
    },
    OP_SET: {
        path: "/op-set-top",
        name: "OPセット処理",
    },
    DATA_LIST: {
        path: "/data-list",
        name: "データ確認修正",
    },
    MONTHLY_PROCESS: {
        path: "/monthly-process-top",
        name: "月次処理",
    },
    REPORT: {
        path: "/report-top",
        name: "管理レポート",
    },
    LABEL: {
        path: "/label-top",
        name: "ラベル発行",
    },
    MASTER_MAINTENANCE: {
        path: "/master-maintenance-top",
        name: "マスタメンテナンス",
    },
    DATA_CONVERSION: {
        path: "/data-conversion",
        name: "データ変換",
    },
    ADMIN: {
        path: "/admin-hospital-top",
        name: "管理者画面",
    },
    LOGOUT: {
        path: "/logout",
        name: "ログアウト",
    },
    LOGIN: {
        path: '/login',
        name: 'ログアウト'
    }
} as const;

export const MENU_ITEMS = [
    { href: ROUTES_MENU.HOME.path, label: ROUTES_MENU.HOME.name },
    { href: ROUTES_MENU.CONSUMPTION.path, label: ROUTES_MENU.CONSUMPTION.name },
    { href: ROUTES_MENU.DISPENSING.path, label: ROUTES_MENU.DISPENSING.name },
    { href: ROUTES_MENU.TEMP_BILLING.path, label: ROUTES_MENU.TEMP_BILLING.name },
    { href: ROUTES_MENU.UNORDERED_MATERIAL.path, label: ROUTES_MENU.UNORDERED_MATERIAL.name },
    { href: ROUTES_MENU.RETURN.path, label: ROUTES_MENU.RETURN.name },
    { href: ROUTES_MENU.ORDER.path, label: ROUTES_MENU.ORDER.name },
    { href: ROUTES_MENU.ARRIVAL.path, label: ROUTES_MENU.ARRIVAL.name },
    { href: ROUTES_MENU.INVENTORY.path, label: ROUTES_MENU.INVENTORY.name },
    { href: ROUTES_MENU.BID.path, label: ROUTES_MENU.BID.name },
    { href: ROUTES_MENU.OP_SET.path, label: ROUTES_MENU.OP_SET.name },
    { href: ROUTES_MENU.DATA_LIST.path, label: ROUTES_MENU.DATA_LIST.name },
    { href: ROUTES_MENU.MONTHLY_PROCESS.path, label: ROUTES_MENU.MONTHLY_PROCESS.name },
    { href: ROUTES_MENU.REPORT.path, label: ROUTES_MENU.REPORT.name },
    { href: ROUTES_MENU.LABEL.path, label: ROUTES_MENU.LABEL.name },
    { href: ROUTES_MENU.MASTER_MAINTENANCE.path, label: ROUTES_MENU.MASTER_MAINTENANCE.name },
    { href: ROUTES_MENU.DATA_CONVERSION.path, label: ROUTES_MENU.DATA_CONVERSION.name },
    { href: ROUTES_MENU.ADMIN.path, label: ROUTES_MENU.ADMIN.name },
    { href: ROUTES_MENU.LOGOUT.path, label: ROUTES_MENU.LOGOUT.name },
] as const;
