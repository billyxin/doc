## 远程查看 fetch/push 
git remote -v

## 远程关联
git remote add origin git@github.com:<url>
git push -u origin master 首次用-u 关联仓库
git clone <url> 克隆自动关联

## 本地查看
git log
git diff <onefile> 显示工作区和仓库的文件不同
git log --graph

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

## 分支
git branch
git branch -d <branch>
git branch -D <branch>强制删除
git branch --set-upstream-to=origin/dev dev 分支建立关联
git branch --set-upstream-to dev origin/dev  分支建立关联2
git switch
git switch -c 创建并切换至
git switch -c origin/dev 创建本地分支并关联远程分支
git merge
git merge --no-ff 禁用fast forward
git pull

git stash 暂存
git stash list
git stash apply 恢复
git stash drop 删除
git stash pop 恢复同时删除

git cherry-pick <another commitid> 提交另一个分支的某个提交

git rebase 提交整理直线

git tag v1.0 打标 tag只关联commit
git tag v1.0 <commitid> 打标
git tag 查看所有
git show <tagname>
git tag -d <tagname> 本地删除
git push origin :refs/tags/<tagname> 远程删除

## 设置
git config --global core.autocrlf false
