import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://terms.naver.com/list.naver?cid=42701&categoryId=62872&so=st4.asc',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

content = soup.find("li", {"class":"contents_sub active"})
menus = content.findAll("a", {"class":None})

for menu in menus:
    name = menu.text
    link = "https://terms.naver.com/" + menu['href']
    print(name)

    linkdata = requests.get(link,headers=headers)
    subpage = BeautifulSoup(linkdata.text, 'html.parser')

    subcontent = subpage.select("p:nth-child(6)")

    for ingredients in subcontent:
        ingre = ingredients.text
        print(ingre)
