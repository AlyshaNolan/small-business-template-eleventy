const pluginBookshop = require("@bookshop/eleventy-bookshop");
const yaml = require("js-yaml");
const svgContents = require("eleventy-plugin-svg-contents")

const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt({
    html: true,
  });


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/styles");
    eleventyConfig.addPassthroughCopy("css");

    // Data extensions
    eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))
    eleventyConfig.addDataExtension('yml', contents => yaml.load(contents))
    // Bookshop
    eleventyConfig.addWatchTarget("component-library/");

    eleventyConfig.addPlugin(pluginBookshop({
		bookshopLocations: ["component-library"],
		pathPrefix: '',
	}));

    // Plugins
    eleventyConfig.addPlugin(svgContents);

    // Filters
    eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));

    eleventyConfig.addFilter('contains_block', function(content_blocks, blockName) {
      if (!Array.isArray(content_blocks)) {
        return false;
      }
      return content_blocks.some(block => block._bookshop_name === blockName);
    });

    eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    }
}