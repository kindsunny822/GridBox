# 钉钉多维表字段模板上架申请填写草稿

## 01 Github地址

```text
https://github.com/kindsunny822/GridBox
```

如果使用 private repo，需要给以下邮箱开通访问权限：

```text
notable-opens@service.dingtalk.com
```

## 02 名称-中文

```text
电商AI生图
```

## 03 名称-英文

```text
Ecom AI Image
```

## 04 名称-日文

```text
EC AI画像
```

## 05 描述-中文

```text
引用商品名称和卖点，批量生成主图、场景图、直通车图，并写回图片附件。
```

## 06 描述-英文

```text
Generate ecommerce product images from table fields and write results back as image attachments.
```

## 07 描述-日文

```text
表フィールドの商品情報からEC商品画像を生成し、画像添付として書き戻します。
```

## 08 运营图片-中文

需要上传 1440x800 图片。

建议画面内容：

```text
GridBox 电商AI生图，在钉钉 AI 表格中批量生成电商主图、场景图、直通车图。
```

## 09 运营图片-英文

需要上传 1440x800 图片。

建议画面内容：

```text
GridBox Ecommerce AI Image, generate product visuals directly in DingTalk AI Table.
```

## 10 运营图片-日文

需要上传 1440x800 图片。

建议画面内容：

```text
GridBox EC AI画像、DingTalk AI Table 内で商品画像を生成。
```

## 11 图标

使用 `assets/icon.svg`，正方形 SVG。

## 12 开发者-中文

```text
GridBox
```

## 13 开发者-日文

```text
GridBox
```

## 14 开发者-英文

```text
GridBox
```

## 15 总RPM

建议第一版填写：

```text
100
```

## 16 单租户RPM

建议第一版填写：

```text
10
```

## 17 答疑群链接

需要你在钉钉里创建一个用户答疑群，然后复制入群链接。

建议群名：

```text
GridBox 电商AI生图用户答疑群
```

## 提交前必须完成

1. 准备稳定 HTTPS 后端域名，不能使用 localhost、localhost.run 或 localtunnel 临时域名。
2. 把 `src/index.ts` 里的 `api.gridbox.example.com` 替换成真实 GridBox API 域名。
3. 把 `instructionsUrl` 替换成真实 GridBox 控制台地址。
4. 准备 1440x800 运营图片和正方形图标。
5. 创建钉钉答疑群并复制群链接。
