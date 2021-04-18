
//在终端输入webpack会以名为webpack.config.js的文件为配置依赖进行打包

let {resolve} = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin")
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
                    {loader:"style-loader"},//创建style标签，将js中的样式插入到html的head中
                    {loader:"css-loader"},//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                ]
            },
            {
                test:/\.less$/,//匹配哪些文件,
                use:[//对匹配到的文件使用哪些loader 逆序执行
                    {loader:"style-loader"},//创建style标签，将js中的样式插入到html的head中
                    {loader:"css-loader"},//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                    {loader:"less-loader"},//将less文件编译成css文件
                    //注意还要下载less
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
                    outputPath:'img'
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
            //其他资源
            {
                exclude:/\.(css|html|js|less|jpg|png|gif)$/,//不被匹配的
                loader:"file-loader",
                options:{
                    name:"[hash:8].[ext]",
                    outputPath:'lib'
                }
            }
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' })//这样做会以./src/index.html为基础引入打包好的资源
    ],
    mode:'development',//production//打包模式
    //开发服务器
    devServer:{
        //注意注意注意注意折磨我到凌晨一点：
        //要想在webpack5中使用devServer必须将所有依赖安装为开发依赖 -D （--save不知道行不行没试过）
        //并且要将"start": "webpack serve --open"配置进package.json,
        //直接执行webpack serve --open 不行！！！！！有bug！！！！！
        //要是webpack-dev-server安装不上就先执行换源npm config set registry https://registry.npm.taobao.org  再安装

        //特点：只会在内存中编译打包，不会有任何输出
        //启动：将webpack serve --open配置进package.json中执行 否则在webpack5中执行不起来(只会在内存中编译打包，不会有任何输出)
        contentBase:resolve(__dirname,"build"),//需要运行的文件的目录
        compress:true,//启动gzip压缩
        port:8848,
        open:true,//自动打开浏览器
    }
    
}