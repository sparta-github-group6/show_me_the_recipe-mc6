import requests, re
from bs4 import BeautifulSoup
from pymongo import MongoClient

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

client = MongoClient('localhost', 27017)
db = client.dbmaking

for i in range(1, 15):  # 1~14페이지까지 반복
    link = 'https://terms.naver.com/list.naver?cid=42701&categoryId=62872&so=st1.dsc&viewType=&categoryType=&page=' + str(
        i)
    data = requests.get(link, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    recipes = soup.select('#content > div.list_wrap > ul > li')  # 각 레시피별 list
    for recipe in recipes:
        a_tag = recipe.select_one('div.info_area > div.subject > strong > a')
        name = a_tag.text.split('[', maxsplit=1)[0].strip()
        recipe_link = 'https://terms.naver.com/' + a_tag['href']
        recipe_data = requests.get(recipe_link)
        recipe_soup = BeautifulSoup(recipe_data.text, 'html.parser')
        lis = str(recipe_soup.findAll("p", {"class": 'txt'})).split('</p>', maxsplit=1)
        lis = lis[1].split('</p>', maxsplit=1)
        list_for_recipe = re.sub('<.+?>', '', lis[0], 0).strip()
        list_for_recipe = list_for_recipe[2:len(list_for_recipe)]
        lis = re.sub('<.+?>', '', lis[0], 0).strip().split(',')
        list_for_search = list(filter(None, lis))
        chkimage = recipe.find(class_='thumb_area')
        if chkimage is not None:
            img = recipe.select_one('div.thumb_area > div.thumb > a > img')['data-src']
            for i in range(len(list_for_search)):
                list_for_search[i] = list_for_search[i].split(maxsplit=1)[0]

            page3 = recipe_soup.select_one('#size_ct')
            list_page3 = page3.find_all(['h3', 'p'])
            nl = []
            for li in list_page3:
                nl.append(li.text)
                # print(li.text)
            nl = nl[2:len(nl)]
            if len(nl) < 26:
                if '준비하기' in nl:
                    nl = ''.join(nl).replace('(4인분)', '')
                    desc = nl.split('재료 및 분량')[0]
                    ingredient = nl.split('재료 및 분량')[1].split('준비하기')[0]
                    precook = nl.split('재료 및 분량')[1].split('준비하기')[1].split('만들기')[0]
                    making = nl.split('재료 및 분량')[1].split('준비하기')[1].split('만들기')[1]

                    precook = precook.split('.')
                    making = making.split('.')
                    making = list(filter(None, making))
                    precook = list(filter(None, precook))

                    search = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
                    for word in precook:
                        if word in search:
                            precook.remove(word)
                    for word in making:
                        if word in search:
                            making.remove(word)

                    print(name, list_for_search, list_for_recipe, desc, ingredient, precook, making)

                    doc = {
                        'name': name,
                        'search': list_for_search,
                        'ingredients': list_for_recipe,
                        'desc': desc,
                        'ingredient':ingredient,
                        'precook':precook,
                        'making':making,
                        'like':0
                    }
                    db.recipes.insert_one(doc)

doc2 = {'name': '검색', 'index': '물'}
doc3 = {'name': '검색2', 'index': '계란찜'}
db.search.insert_one(doc2)
db.search.insert_one(doc3)

