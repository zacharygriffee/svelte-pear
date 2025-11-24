import fs from "fs";
import path from "path";

const cwd = process.cwd();
const packagePath = path.join(cwd, "package.json");
const templatePath = path.join(cwd, "package.template.json");

const command = process.argv[2] ?? "write";

function readSource() {
    const source = fs.existsSync(templatePath) ? templatePath : packagePath;
    return JSON.parse(fs.readFileSync(source, "utf8"));
}

function backupTemplate() {
    if (fs.existsSync(templatePath)) return;
    fs.copyFileSync(packagePath, templatePath);
}

function numberFromEnv(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function writeDevPackage() {
    backupTemplate();
    const pkg = readSource();

    const name = process.env.APP_NAME || "svelte-pear-dev";
    const height = numberFromEnv(process.env.PEAR_HEIGHT, 768);
    const width = numberFromEnv(process.env.PEAR_WIDTH, 1024);
    const license =
        process.env.PEAR_LICENSE ||
        (pkg.license && !pkg.license.startsWith("__") ? pkg.license : "Apache-2.0");

    pkg.name = name;
    pkg.license = license;
    pkg.pear = pkg.pear || {};
    pkg.pear.name = name;
    pkg.pear.type = pkg.pear.type || "desktop";
    pkg.pear.gui = pkg.pear.gui || {};
    pkg.pear.gui.height = height;
    pkg.pear.gui.width = width;

    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`Wrote dev package.json for ${name} (${width}x${height})`);
}

function restoreTemplate() {
    if (!fs.existsSync(templatePath)) {
        console.error("No package.template.json found to restore.");
        process.exitCode = 1;
        return;
    }
    fs.copyFileSync(templatePath, packagePath);
    console.log("Restored template package.json");
}

if (command === "restore") {
    restoreTemplate();
} else {
    writeDevPackage();
}
