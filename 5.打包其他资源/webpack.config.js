
//在终端输入webpack会以名为webpack.config.js的文件为配置依赖进行打包

let {resolve} = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports={
    entry:"./src/index.js",//入口起点
    output:{//输出配置
        filename:'built.js',//输出的文件名
        path:resolve(__dirname,'build')//输出路径
    },
    module:{//loader配置
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"}
                ]
            },
            {
                exclude:/\.(css|html|js|less)$/,//不被匹配的
                loader:"file-loader",
                options:{
                    name:"[hash:8].[ext]"
                }
            }
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' })//这样做会以./src/index.html为基础引入打包好的资源
    ],
    mode:'development'//production//打包模式
}