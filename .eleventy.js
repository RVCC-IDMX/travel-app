module.exports = function (eleventyConfig) {

    //Passthru files
    eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("./src/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("./src/**/*.png");
    eleventyConfig.addPassthroughCopy("./src/**/*.svg");
    eleventyConfig.addPassthroughCopy("./src/**/*.pdf");

    //Ignore the output directory
    eleventyConfig.ignores.add("_site");

    //Grab all cities
    eleventyConfig.addCollection("cities", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/cities/*/index.md");
    })

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "./src",
            output: "./_site"
        }
    }
}