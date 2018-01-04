@echo OFF
echo running SVG Spriter Node
echo ------------------------
cd /d %~dp0\..\..
SET NODE_ENV=production
node bin\www

pause