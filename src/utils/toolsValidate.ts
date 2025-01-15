
/**
 * 正整数验证
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifiyNumberInteger(val: string) {
	// 匹配空格
	let v = val.replace(/(^\s*)|(\s*$)/g, '');
	// 去掉 '.' , 防止贴贴的时候出现问题 如 0.1.12.12
	v = v.replace(/[\.]*/g, '');
	// 去掉以 0 开始后面的数, 防止贴贴的时候出现问题 如 00121323
	v = v.replace(/(^0[\d]*)$/g, '0');
	// 首位是0,只能出现一次
	v = v.replace(/^0\d$/g, '0');
	// 只匹配数字
	v = v.replace(/[^\d]/g, '');
	// 返回结果
	return v;
}

/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export const conditionPhone = /^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9])|(16[0-9]))|(17([0-3]|[5-9]))|(18[0-9])|(19[0-9]))\d{8}$/
export function verifyPhone(val: string) {
	// false: 手机号码不正确
	if (!conditionPhone.test(val)) return false;
	// true: 手机号码正确
	else return true;
}