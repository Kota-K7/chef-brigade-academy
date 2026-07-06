@echo off
echo Updating Chef Brigade Academy metadata statistics...
python -c "import sys; sys.path.append('scratch'); from import_wiktionary import update_meta_json; update_meta_json()"
echo.
echo Done! Please refresh your browser or reload the page to see changes.
pause
