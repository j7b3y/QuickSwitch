import {exec ,toast } from './kernelsu.js';

export async function run(cmd) {
	const { errno, stdout, stderr } = await exec(cmd,{ cwd: '/data/adb/modules/quickswitch' });
	if (errno != 0) {
		toast(`stderr: ${stderr}`);
		return undefined;
	} else {
		return stdout;
	}
}