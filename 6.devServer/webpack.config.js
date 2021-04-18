
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
            
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' })//这样做会以./src/index.html为基础引入打包好的资源
    ],
    mode:'development',//production//打包模式
    //开发服务器
    devServer:{
        //这个可能运行不起来 具体见7.开发配置
        //特点：只会在内存中编译打包，不会有任何输出
        //启动：将webpack serve --open配置进package.json中执行 否则在webpack5中执行不起来(只会在内存中编译打包，不会有任何输出)
        contentBase:resolve(__dirname,"build"),//需要运行的文件的目录
        compress:true,//启动gzip压缩
        port:8848,
        open:true,//自动打开浏览器
    }
    
}