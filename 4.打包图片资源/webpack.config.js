
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
            //打包css中的图片
            {//url-loader依赖于file-loader 请记得下载file-loader
                test:/\.(jpg|png|gif)$/,
                loader:"url-loader",
                options:{
                    //当图片小于15kb，就会被编译为base64
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大（文件请求速度会变慢）
                    limit:15*1024,
                    esModule:false,
                    //[hash:8]取图片的hash前8位，[ext]是文件的原扩展名
                    name: '[hash:8].[ext]',
                },
                
            },
            //打包html中的img标签(负责引入img，从而能被url-loader处理)
            {
                test:/\.html$/,
                loader:"html-loader",
                options:{
                    esModule:false,
                }
            },
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' })//这样做会以./src/index.html为基础引入打包好的资源
    ],
    mode:'development'//production//打包模式
}