
//在终端输入webpack会以名为webpack.config.js的文件为配置依赖进行打包

let {resolve} = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin=require("mini-css-extract-plugin");
module.exports={
    entry:"./src/js/index.js",//入口起点
    output:{//输出配置
        filename:'js/built.js',//输出的文件名
        path:resolve(__dirname,'build')//输出路径
    },
    module:{//loader配置
        rules:[
            {
                test:/\.css$/,//匹配哪些文件,
                use:[//对匹配到的文件使用哪些loader 逆序执行
                    // {loader:"style-loader"},//创建style标签，将js中的样式插入到html的head中
                    {loader:MiniCssExtractPlugin.loader},//取代style-loader 作用：提取js中的css成单独文件
                    {loader:"css-loader"},//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                ]
            }
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' }),//这样做会以./src/index.html为基础引入打包好的资源
        new MiniCssExtractPlugin({
            filename:'css/built.css'//对输出的文件重命名
        })
    ],
    mode:'development',//production//打包模式
    
}