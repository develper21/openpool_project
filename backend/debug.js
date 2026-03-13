const { execSync } = require('child_process');
const fs = require('fs');

try {
  execSync('npx prisma validate', { stdio: 'pipe' });
  fs.writeFileSync('prisma_err.json', JSON.stringify({ success: true }));
} catch (e) {
  fs.writeFileSync('prisma_err.json', JSON.stringify({ stdout: e.stdout.toString(), stderr: e.stderr.toString() }));
}
