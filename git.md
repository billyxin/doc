## 远程查看 fetch/push

git remote -v

## 远程关联

git remote add origin git@github.com:<url>
git push -u origin master 首次用-u 关联仓库
git clone <url> 克隆自动关联

## 本地查看

git log
git diff <onefile> 显示工作区和仓库的文件不同

## 移动指针

git reset HEAD^ 上一版本
git reset HEAD^^ 上上一版本
git reset HEAD~100 上 100 个版本
git reflog 查看 commitid
git reset --hard <commitid>

## 本地撤销

git checkout -- <file> 回上一个状态( staged -> unstaged or modified->unmodified 不同)
git checkout -- 全部撤回

## 本地删除

git rm <file> 后 commit 同电脑删除无记录
git checkout -- <file> 撤回已经 tracked 过没有 rm 过的的文件

## 设置
git config --global core.autocrlf false

