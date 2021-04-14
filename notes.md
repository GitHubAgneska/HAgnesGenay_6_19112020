### .gitignore universal setup one-liner

    touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status

----

### deploy to ghpages from app/src

    git subtree push --prefix app/src origin gh-pages

---

---
### SASS install /use
---
- `brew sass`  or  `npm i sass`
- create sass input folder +  css output folder
- have html point towards css output files

- add script to package.json to automatically update/recompile scss changes and output to css :  
        
        "scripts": {
            "scss": "sass --watch scss:css"
            }

- run command `sass ` or  `npm run sass`

- !! browser inspector => deactivate 'show original sources' so it uses .css stylesheet and not .scss (which sass syntax will not do here in the browser)

---
---

SASS SCSS AUTOPREFIXER
-----
- install: 

        npm install autoprefixer postcss postcss-cli -g

- add script:

        "prefix": "postcss ./css/ohmyfood-main.css --use autoprefixer -d ./css/prefixed/"

- and       
        
        "browserslist": "last 4 versions"

- run:

        npm run prefix


----


DEPLOY DIST TO GITHUBPAGES
-----------

` git subtree push --prefix dist origin gh-pages `


CHROME FETCH CORS - iSSUE (to launch ghpages deploy)
-----

Launch 'chrome://flags/#temporary-unexpire-flags-m87' from address bar.
Set to Enabled.
Restart Chrome.
Launch 'chrome://flags/#allow-insecure-localhost'
It will be visible now, so simply enable it.
Restart Chrome again.

----
