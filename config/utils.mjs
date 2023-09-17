import fs from "fs-extra";

function getBanner() {
    const year = new Date().getFullYear();
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

//头部的版权信息
    return `/*!
 * bootstrap-validation v${pkg.version} (${pkg.homepage})
 * Copyright 2023-${year} ${pkg.author}
 * license ${pkg.license} (https://gitee.com/ajiho/bootstrap-validation/blob/master/LICENSE)
 */\n`;
}

export {
    getBanner
}
