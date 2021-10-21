import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://terms.naver.com/list.naver?cid=42701&categoryId=62872&so=st4.asc', headers=headers)

client = MongoClient('localhost', 27017)
db = client.dbmaking

content = soup.find("li", {"class": "contents_sub active"})
menus = content.findAll("a", {"class": None})


headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

for i in range(1,15): # 1~14페이지까지 반복
    link = 'https://terms.naver.com/list.naver?cid=42701&categoryId=62872&so=st1.dsc&viewType=&categoryType=&page=' + str(i)
    data = requests.get(link, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    recipes = soup.select('#content > div.list_wrap > ul > li') # 각 레시피별 list
    for recipe in recipes:
        a_tag = recipe.select_one('div.info_area > div.subject > strong > a')
        name = a_tag.text
        recipe_link = 'https://terms.naver.com/' + a_tag['href']
        recipe_data = requests.get(recipe_link)
        recipe_soup = BeautifulSoup(recipe_data.text, 'html.parser')
        lis = str(recipe_soup.findAll("p", {"class": 'txt'})).split('</p>', maxsplit=1)
        lis = lis[1].split('</p>', maxsplit=1)
        list_for_recipe = re.sub('<.+?>', '', lis[0], 0).strip()
        lis = re.sub('<.+?>', '', lis[0], 0).strip().split(',')
        list_for_search = list(filter(None, lis))
        chkimage = recipe.find(class_='thumb_area')
        if chkimage is not None:
            img = recipe.select_one('div.thumb_area > div.thumb > a > img')['data-src']
            for i in range(len(list_for_search)):
                list_for_search[i] = list_for_search[i].split(maxsplit=1)[0]

            print(name,list_for_search,list_for_recipe,img)