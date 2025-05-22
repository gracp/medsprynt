2025-05-22T14:38:36.606061577Z	Cloning repository...
2025-05-22T14:38:37.820564729Z	From https://github.com/gracp/medsprynt
2025-05-22T14:38:37.820893534Z	 * branch            8ba09869f198b1fe465b83d4e25c5e8b4e84bdbd -> FETCH_HEAD
2025-05-22T14:38:37.821067384Z	
2025-05-22T14:38:38.602160319Z	HEAD is now at 8ba0986 Initial commit
2025-05-22T14:38:38.602456535Z	
2025-05-22T14:38:38.688713371Z	
2025-05-22T14:38:38.689118801Z	Using v2 root directory strategy
2025-05-22T14:38:38.732372014Z	Success: Finished cloning repository files
2025-05-22T14:38:40.450063321Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-05-22T14:38:40.450616865Z	
2025-05-22T14:38:41.565118414Z	No wrangler.toml file found. Continuing.
2025-05-22T14:38:41.632210123Z	Detected the following tools from environment: npm@9.6.7, nodejs@18.17.1
2025-05-22T14:38:41.668544566Z	Installing project dependencies: npm clean-install --progress=false
2025-05-22T14:38:44.532150076Z	npm WARN deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
2025-05-22T14:38:45.409325197Z	npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
2025-05-22T14:38:45.441303685Z	npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-05-22T14:38:47.425502971Z	
2025-05-22T14:38:47.425532726Z	added 490 packages, and audited 491 packages in 5s
2025-05-22T14:38:47.425968418Z	
2025-05-22T14:38:47.425992137Z	143 packages are looking for funding
2025-05-22T14:38:47.4259975Z	  run `npm fund` for details
2025-05-22T14:38:47.431856721Z	
2025-05-22T14:38:47.431891243Z	3 high severity vulnerabilities
2025-05-22T14:38:47.431895234Z	
2025-05-22T14:38:47.431898831Z	To address all issues (including breaking changes), run:
2025-05-22T14:38:47.431902307Z	  npm audit fix --force
2025-05-22T14:38:47.431905283Z	
2025-05-22T14:38:47.431909995Z	Run `npm audit` for details.
2025-05-22T14:38:47.928921714Z	Executing user command: npm install && npm run build
2025-05-22T14:38:49.327443131Z	
2025-05-22T14:38:49.327602569Z	up to date, audited 492 packages in 897ms
2025-05-22T14:38:49.327776021Z	
2025-05-22T14:38:49.327938354Z	143 packages are looking for funding
2025-05-22T14:38:49.328139406Z	  run `npm fund` for details
2025-05-22T14:38:49.333423532Z	
2025-05-22T14:38:49.333495958Z	3 high severity vulnerabilities
2025-05-22T14:38:49.333597094Z	
2025-05-22T14:38:49.333823288Z	To address all issues (including breaking changes), run:
2025-05-22T14:38:49.333908385Z	  npm audit fix --force
2025-05-22T14:38:49.334235346Z	
2025-05-22T14:38:49.334370965Z	Run `npm audit` for details.
2025-05-22T14:38:49.889646209Z	
2025-05-22T14:38:49.88993854Z	> medsprynt-site@1.0.0 build
2025-05-22T14:38:49.889947661Z	> npm-run-all css:build eleventy:build
2025-05-22T14:38:49.890199883Z	
2025-05-22T14:38:50.366564849Z	
2025-05-22T14:38:50.367170883Z	> medsprynt-site@1.0.0 css:build
2025-05-22T14:38:50.367265756Z	> postcss src/css/main.css -o _site/css/main.css --verbose
2025-05-22T14:38:50.3673873Z	
2025-05-22T14:38:50.608005698Z	[36mProcessing [1msrc/css/main.css[22m...[39m
2025-05-22T14:38:52.095743234Z	[32mFinished [1msrc/css/main.css[22m in [1m1.49 s[22m[39m
2025-05-22T14:38:52.421715277Z	
2025-05-22T14:38:52.421818093Z	> medsprynt-site@1.0.0 eleventy:build
2025-05-22T14:38:52.421941025Z	> eleventy
2025-05-22T14:38:52.421952226Z	
2025-05-22T14:38:52.898908815Z	[11ty] Writing _site/sitemap.xml from ./src/sitemap.njk
2025-05-22T14:38:52.911543188Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.912088876Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.91286895Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.915896391Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.916072334Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.916588345Z	Invalid date: now, using current date instead.
2025-05-22T14:38:52.916914125Z	[11ty] Writing _site/404.html from ./src/404.njk
2025-05-22T14:38:52.917003939Z	[11ty] Writing _site/blog/index.html from ./src/blog.njk
2025-05-22T14:38:52.917136429Z	[11ty] Writing _site/index.html from ./src/index.njk
2025-05-22T14:38:52.91730656Z	[11ty] Writing _site/blog/compliance-automation-fda-hipaa/index.html from ./src/blog/compliance-automation-fda-hipaa.md (liquid)
2025-05-22T14:38:52.91768277Z	[11ty] Writing _site/blog/inventory-automation-medtech/index.html from ./src/blog/inventory-automation-medtech.md (liquid)
2025-05-22T14:38:52.917913896Z	[11ty] Writing _site/blog/medtech-marketing-automation/index.html from ./src/blog/medtech-marketing-automation.md (liquid)
2025-05-22T14:38:52.927632293Z	[11ty] Copied 21 files / Wrote 7 files in 0.22 seconds (v2.0.1)
2025-05-22T14:38:52.967874073Z	Finished
2025-05-22T14:38:53.916532347Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-05-22T14:38:53.916927632Z	
2025-05-22T14:38:55.024190241Z	No wrangler.toml file found. Continuing.
2025-05-22T14:38:55.025088871Z	Note: No functions dir at /functions found. Skipping.
2025-05-22T14:38:55.025167077Z	Validating asset output directory
2025-05-22T14:38:57.79291591Z	Deploying your site to Cloudflare's global network...
2025-05-22T14:39:00.402912264Z	Uploading... (0/28)
2025-05-22T14:39:01.017691035Z	Uploading... (9/28)
2025-05-22T14:39:01.090436982Z	Uploading... (18/28)
2025-05-22T14:39:01.161788791Z	Uploading... (28/28)
2025-05-22T14:39:01.161827792Z	✨ Success! Uploaded 28 files (1.58 sec)
2025-05-22T14:39:01.161834571Z	
2025-05-22T14:39:01.662301081Z	✨ Upload complete!