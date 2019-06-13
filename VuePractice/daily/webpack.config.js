/**
 * webpack的配置文件来支持对.vue文件及ES6的解析
 **/
var path=require('path');
//导入插件
var ExtractTextPlugin=require('extract-text-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
var config={
    entry:{
        main:'./main'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist',
        filename:'main.js'
    },
    module:{
        rules:[
            //支持对.vue文件的解析
            {
                test:/\.vue$/,
                loader:'vue-loader',
                //options进一步对不同语言进行配置，对css进行处理时，
                // 先通过css-loader解析，然后把处理结果再交给vue-style-loader处理
                options:{
                    loaders:{
                        css:ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            //支持对ES6文件的解析
            {
              test:/\.js$/,
              loader: 'babel-loader',
              exclude:/node_modules/
            },
            //支持对css文件的解析
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            },
            {
                test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader:'url-loader?limit=1024'
            }
        ]
    },
    plugins:[
        //重命名提取后的css文件
        new ExtractTextPlugin("main.css"),
        //vue-loader在15.*后的版本需要伴生VueLoaderPlugin的，否则启动报错
        new VueLoaderPlugin()
    ]
};
//相当于export default config,由于未安装支持ES6的编译插件，不能直接使用ES6的语法
module.exports=config;
