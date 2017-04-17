/**
 * text colors 字体颜色
 *  black   => 黑
 *  red     => 红
 *  green   => 绿
 *  yellow  => 黄
 *  blue    => 蓝
 *  magenta => 品红
 *  cyan    => 青
 *  white   => 白
 *  gray    => 灰(美国)
 *  grey    => 银(英国)
 */

/**
 * background colors 背景色
 *  bgBlack   => 黑
 *  bgRed     => 红
 *  bgGreen   => 绿
 *  bgYellow  => 黄
 *  bgBlue    => 蓝
 *  bgMagenta => 品红
 *  bgCyan    => 青
 *  bgWhite   => 白
 */

/**
 * styles 字体样式
 *  reset         => 重置 
 *  bold          => 加粗
 *  dim           => 暗色调
 *  italic        => 斜体
 *  underline     => 下划线
 *  inverse       => 背景色和字体颜色颠倒
 *  hidden        => 隐藏
 *  strikethrough => 删除线
 */

const
    colors = require('colors/safe');

colors.themes = {
    info: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
    color: 'COLOR',
    input: 'INPUT'
};

colors.setTheme({
    INFO: ['green', 'bold'], //信息 => 绿色，加粗
    WARN: ['magenta', 'bold', 'underline'], //警告 => 品红色，加粗，下划线
    ERROR: ['red', 'bold'], //错误 => 红色，加粗
    COLOR: ['rainbow', 'bold'], //彩虹 => 彩色，加粗
    INPUT: ['grey', 'bold'] //输入 => 灰色，加粗
})

/**
 * 根据自定义的主题，导出对应的函数
 * 函数名为主题名称的小写
 */
for (theme in colors.themes) {

    (function(theme) {

        colors[theme] = function(msg) {

            //将object 转化为 string
            if (typeof msg === 'object') msg = JSON.stringify(msg);

            console.log(eval(`colors.${colors.themes[theme]}('${msg}')`));
        };
    })(theme);

};

/**
 * 输出信息
 * @param str   要输出的内容
 * @param theme 主题
 */
log = (str, theme) => {

    if (typeof str === 'object') str = JSON.stringify(str);

    theme = theme.toUpperCase();

    try {
        console.log(eval(`colors.${theme}('${str}')`));
    } catch (error) {
        console.log(`Please choose right theme : INFO, WARN, ERROR, COLOR, INPUT`);
    }
}

delete colors['setTheme'];
module.exports = colors;