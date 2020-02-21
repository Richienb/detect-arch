const test = require("ava")
const detectArch = require(".")

test("main", async (t) => {
	t.is(await detectArch("fixtures/vlc32.exe"), "32")
	t.is(await detectArch("fixtures/vlc64.exe"), "64")
})
