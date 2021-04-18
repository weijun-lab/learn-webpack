
//在终端输入webpack会以名为webpack.config.js的文件为配置依赖进行打包

let {resolve} = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    entry:"./src/index.js",//入口起点
    output:{//输出配置
        filename:'js/built.js',//输出的文件名
        path:resolve(__dirname,'build')//输出路径
    },
    module:{//loader配置
        rules:[
            {//语法检查
                test:/\.js$/,
                loader:"eslint-loader",//eslint-loader依赖于eslint 别忘了下载,
                exclude:/node_modules/,//排除node_modules下的文件
                options:{
                    fix:true//自动修复检查出的错误
                }
                //配置好之后配置检查规则，这里配置airbnb规则
                //还需要另外下载eslint-config-airbnb-base(还有其他版本，详见npm网站) eslint-plugin-import
                //最后在package.json中配置
                // "eslintConfig":{
                //     "extends":"airbnb-base"
                //   }
            }
        ]
    },
    plugins:[//插件配置
        // new HtmlWebpackPlugin()//默认只会在出口文件夹下创建一个空的html，自动把打包好的资源引入进去
        new HtmlWebpackPlugin({ template: './src/index.html' }),//这样做会以./src/index.html为基础引入打包好的资源
    ],
    mode:'development',//production//打包模式
    
}