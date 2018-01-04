@echo OFF
cd /d %~dp0\..\..
IF NOT EXIST node_modules (
	echo Installing Web SVG Spriter
	echo --------------------------
	Call npm install
)
	
IF NOT EXIST public\generator\grunt\sprite\node_modules (
	echo Installing sprite generator
	echo --------------------------
	cd "public\generator\grunt\sprite"
	Call npm install
)

echo installation succeed !

pause