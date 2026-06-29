# GridBox 电商AI生图

`电商AI生图` 是 GridBox 面向电商运营场景的钉钉 AI 表格 FaaS 字段模板。用户可以在 AI 表格中引用商品名称、核心卖点等字段，选择图片类型、风格和分辨率，然后由 GridBox 服务生成电商图片并写回当前字段。

## 功能说明

- 支持引用当前行文本字段作为商品信息。
- 支持电商主图、场景图、直通车图、详情图。
- 支持 1K、2K、4K 分辨率选择。
- 支持通过 GridBox API Key 授权扣减积分。
- 返回结果为图片附件字段。

## 运行环境

- Node.js 16.x
- dingtalk-docs-cool-app 0.3.16+

## 本地调试

```bash
npm install
cp config.example.json config.json
npm run start
```

然后在钉钉 AI 表格中进入：

```text
插件 -> AI字段开发助手 -> FaaS调试 -> 添加字段
```

本地服务默认由 `dingtalk-docs-cool-app` 启动在 `8088` 端口。

## 生产配置

正式提交前需要把 `src/index.ts` 中的两个地址替换为真实线上地址：

```ts
const GRIDBOX_DOMAIN = "api.gridbox.example.com";
instructionsUrl: "https://gridbox.example.com/console";
```

注意：`fieldDecoratorKit.setDomainList` 只能填写域名 host，不能填写协议、端口或路径。

## 授权方式

本字段使用 `AuthorizationType.HeaderBearerToken`。用户在钉钉字段配置中填写 GridBox API Key 后，钉钉会在 `context.fetch` 请求中自动添加：

```text
Authorization: Bearer <GridBox API Key>
```

GridBox 服务端根据 API Key 识别用户账号、校验积分、扣减积分并返回图片结果。

## 返回结果

字段返回类型为附件：

```ts
resultType: {
  type: FieldType.Attachment
}
```

成功时返回：

```ts
{
  code: FieldExecuteCode.Success,
  data: [
    {
      fileName: "商品名.png",
      type: "image/png",
      url: "https://api.gridbox.example.com/path/to/image.png"
    }
  ]
}
```

失败时返回：

```ts
{
  code: FieldExecuteCode.Error,
  errorMessage: "生成失败"
}
```

积分不足时返回 `FieldExecuteCode.QuotaExhausted`。

## 审核说明

本仓库只包含钉钉 AI 表格 FaaS 字段模板代码，不包含 GridBox 后端服务代码、密钥或用户数据。后端服务由 GridBox 统一托管，负责图片生成、积分扣减、任务隔离和图片回传。
