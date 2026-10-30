@echo off
title Push Jay Parmar Portfolio to GitHub
color 0b
echo ============================================================
echo         JAY PARMAR AI/ML PORTFOLIO - 1-CLICK GITHUB PUSH
echo ============================================================
echo.
echo Target Repository:
echo https://github.com/jayparmarsrisri111/portfolio-AI_ML.git
echo.
echo Pushing your complete responsive portfolio to GitHub...
echo (If a GitHub sign-in window appears, simply click 'Sign in with your browser')
echo.
cd /d "%~dp0"
git push -u origin main
echo.
echo ============================================================
echo [SUCCESS] Your portfolio code is now live on GitHub!
echo Repository URL: https://github.com/jayparmarsrisri111/portfolio-AI_ML
echo Live Website:   https://jayparmarsrisri111.github.io/portfolio-AI_ML/
echo ============================================================
echo.
pause
