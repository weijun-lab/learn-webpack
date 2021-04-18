
//在终端输入webpack会以名为webpack.config.js的文件为配置依赖进行打包

let {resolve} = require("path");
module.exports={
    entry:"./src/index.js",//入口起点
    output:{//输出配置
        filename:'built.js',//输出的文件名
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
        ]
    },
    plugins:[//插件配置

    ],
    mode:'development'//production//打包模式
}