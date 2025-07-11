const { readFile, writeFile } = require('node:fs/promises');
const { glob } = require('glob');

// TODO: find a way to generate more of the metadata rather than maintaining it manually

// reference the file at https://github.com/joshparkerj/silly-internet-tricks/blob/main/bundle-build.js

// TODO: update the eslint config to handle this file
const delimiter = '==/UserScript==\n';

const processBundles = async function processBundles() {
 const userscriptGlob = await glob('./ts-compiled/**/*.user.js');
 const bundledUserscriptGlob = await glob('./dist/**/*.user.js');
 userscriptGlob.forEach(async (file) => {
    console.log(`Processing ${file}`);
  const fileContents = await readFile(file);

  const name = file.match(/([^./\\]+).user.js$/)[1];
  console.log(`Name: ${name}`);

  const userscriptHeader = fileContents.toString().split(delimiter)[0] + delimiter;
    console.log(`Userscript header: ${userscriptHeader}`);

  if (!userscriptHeader.match(/@source/)) {
   console.warn(`${file} is missing the source field in its metadata`);
  }

  // this generates the path to be used to link to the source file on github
  // however, it may not always work correctly e.g.:
  // // @source       https://github.com/silly-internet-tricks/silly-internet-repo/blob/main/src/src/userscripts/text-effect/marquee-ifier.user.ts
  const sourceEditedUserscriptHeader = userscriptHeader.replace(
   /(@source.*main\/src)(.*)/,
   (_, m1) => `${m1}${file.replace('ts-compiled', '').replace('user.js', 'user.ts')}`,
  );

  const downloadurlEditedUserscriptHeader = sourceEditedUserscriptHeader.replace(
   /(@downloadURL.*raw\/)(.*)/,
   (_, m1) => `${m1}${file.match(/[^/]*$/)[0]}`,
  );
  const updateurlEditedUserscriptHeader = downloadurlEditedUserscriptHeader.replace(
   /(@updateURL.*raw\/)(.*)/,
   (_, m1) => `${m1}${file.match(/[^/]*$/)[0].replace('.user.js', '.meta.js')}`,
  );

  const distFile = bundledUserscriptGlob.find((e) => e.match(new RegExp(`[/\\\\]${name}.user.js`)));
  console.log(`Updating ${distFile}`);

  const distFileContents = await readFile(distFile);
  const bundleWithHeader = updateurlEditedUserscriptHeader + distFileContents.toString();
  await writeFile(distFile, bundleWithHeader);

  const metaFile = distFile.replace('user.js', 'meta.js');
  await writeFile(metaFile, updateurlEditedUserscriptHeader);
 });
};

processBundles();
