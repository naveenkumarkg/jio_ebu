// tslint:disable-next-line: typedef
function item(title: string, below: Array<any>) {
    return { target: '_self', description: null, title, uri: '', below };
}

// tslint:disable-next-line: typedef
function child(title: string, uri: string, description?: string) {
    return { target: '_self', description, title, uri, below: null };
}

export default [
    child('MTN logo', '', 'https://onlinecms.mtn.co.za/sites/default/files/ebu-online-portal/common/mtn_favicon_dark_theme.svg'),
    item('MTN CBU menu', [
        item('Shop', [
            item('Devices', [
                child('Apple', 'https://www.mtn.co.za/shop/deals/devices/apple', ''),
                child('Huawei', 'https://www.mtn.co.za/shop/deals/devices/huawei', ''),
                child('Samsung', 'https://www.mtn.co.za/shop/deals/devices/samsung', ''),
                child('OPPO', 'https://www.mtn.co.za/shop/deals/devices/oppo', ''),
                child('All brands', 'https://www.mtn.co.za/shop/deals/devices', ''),
            ]),
            item('Plans', [child('SIM-only contracts', 'https://www.mtn.co.za/shop/deals/contracts', '')]),
            item('Internet', [child('Home and mobile Internet', 'https://www.mtn.co.za/shop/deals/contracts/data-only', '')]),
            item('Recharge', [
                child('Airtime', 'https://www.mtn.co.za/recharge/airtime', ''),
                child('Data', 'https://www.mtn.co.za/recharge/data', ''),
                child('SMS', 'https://www.mtn.co.za/recharge/sms', ''),
                child('Everyday bundles', 'https://www.mtn.co.za/Pages/mtn-everyday-bundles.aspx', ''),
            ]),
            item('Upgrade', []),
            item('All deals', []),
        ]),
        child('Products & Services', 'https://www.mtnbusiness.co.za/en/sme/Pages/LatestDeals.aspx', ''),
        child('Help & Support', 'https://www.mtnbusiness.co.za/en/pages/contact-us.aspx', ''),
    ]),
];
