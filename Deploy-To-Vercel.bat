@echo off
title Deploy Jay Parmar Portfolio to Vercel
color 0b
echo ============================================================
echo      JAY PARMAR AI/ML PORTFOLIO - 1-CLICK VERCEL DEPLOY
echo ============================================================
echo.
echo Deploying directly to Vercel Production...
echo Target URL: https://jayparmar-portfolio-ai-ml.vercel.app
echo.
cd /d "%~dp0"
call npx --yes vercel deploy --prod --yes
echo.
echo ============================================================
echo  Deployment complete!
echo  Live URL: https://jayparmar-portfolio-ai-ml.vercel.app
echo ============================================================
echo.
pause
