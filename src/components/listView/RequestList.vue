<template>
  <div class="bg-gray-200">
    <Item v-for="(item, index) in listItems" :key="index" :title="item.title" :sender="item.sender" :time="item.time"
      :avatar="item.avatar" :numOfRes="item.numOfRes" :responder="item.responder"  @click="selectItem(item)"/>
  </div>
</template>
  
<script>
import Item from './RequestItem.vue';
import ItemDetail from './ItemDetail.vue';
import { useItemDetail } from '../../stores/itemDetail'
export default {
  components: {
    Item,
  },
  setup() {
    const store = useItemDetail()
    return {
      store
    }
  },
  data() {
    return {
      listItems: [
        {
          id: 1,
          title: 'XiN sử dụng phòng họp của trường để tổ chức các sự kiện .',
          sender: 'Nguyễn Văn A',
          time: '7 hours ago',
          avatar: 'data:image/jpeg;base64,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',
          numOfRes: 3,
          responder: 'Nguyễn',
        },
        {
          id: 2,
          title: 'Title 2',
          sender: 'Sender Name 2',
          time: '5 hours ago',
          avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4A5AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EADgQAAIBAwMCBAUBCAIBBQAAAAECAwAEERIhMQVBEyJRYQYycYGRFBUjQlKhscHRJPDxJTNTYnL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHBEBAQEAAgMBAAAAAAAAAAAAAAERAiEDEjFB/9oADAMBAAIRAxEAPwD6PDpZtL/KRvS7xWRysS62TbFGO5jUkY8tU2KalaY8sa5tqnW8AVsBahdRPGiKMvIewNMZsmMseB3qi1UufHkG/amIynWLaVJT+5ZsfMGNYnrZ0SMxBRx/MMf1719kvYo7gNHNB4i186+OOm2dp0t5rcyIdWNC507nuDwfxRSXpPU47+BYpm0XKg6ZCfmA7UPcyHx+cbEsPesytw8WGDEFTuaOPUEuxqmbS3GR3rQY/r3jwrZGeKtiv1jcEn6n2pSBrALSAjVtXimYWbxAMbY9aI0sPU4lQhU75Jo+165EzBhGFIzWRWbREDnJYCoi40IPdsNQbkfEaw/MQfvV83xBbLbeIDkntmsAsgUudRP1qTSGSMLuAd8elEbK2+KNUxWeIBO2KNHULSeBiw2J4+9fP4XORg5JONzTFJNMRxI2ccdqGNTJcWN0S0a6W7tQk/gRurJOcHtSA3DxMPNhQN8etcuJDLCGUkH0oG3jBVPmBP1q6HqKRPHk8/is+juCBk1O3VzMpkJ2+UUVvIZojG133Xb6ngU4tZ2/SoNPJG/c1hVvWW3/AEwByx8xFbfotgR06O5kjZGONOonJrPIjSxHKAn0FTxmorsg+gqxKI7FKUG2RRC3TDGRQnFdzQw0S51Rkgb5qszHvQ1vP4L4YZBFGyKjqpXbNRVfjL35r1SNnnfxcZr1Vllb9iQEX+Ki0XREiL2FAswN5+84Wii8kr5RdK9jVjVcuM6VRjjfJq3xkXKrjGK4LcE6nbUaG6hItvGdIGSKrIPqfXorEfIXxyud6+bfHPXk6pOsUUOiNTkNk5P1FaLqzI7Ek+bPNZ6+to5c50EUrUYtgBsefT0od4RghTkc/SnV7aKhJXj0xS6WExMNG6molCqzKukswzVyzM3lLdqmY9Q32qRgUBQvPeqJpMTszAAcZqQYts24qnQFYDA+pq1SMDGwPegthz4pznFXSuwTTGPKRkk9qoQsoON8dxVyf8qLRq06TuPWgmj61X5QdskUSDpCkHbc0PFGAulecE4ParY42KKZdscY70BMrYiLJuwG1DJcmNSv8R5JqWrysufxQUisuxOc96AkXPhDOQamOqNjAUUrRSX7kUVDENW/elU5+H5ZG6nFK41gNnB4r7MLpLmzi0OXyRmvj/RSkUuCMelbTpt6YXUq23pUwbnbT+KsTigLK7W4jByMntRy/LUHjzXcVAHNSzQcJPer4JyuFJ5qgcE+le55oDmd1OBkjkVygxcSx+VTt716qySWzqpMpXUDyfSjlni20vkGooippiCjSOferGhi3wg9qpXXkQIWDDArK9d6kdRVSM52pp1ZxbQNj+tY6eTxJGK7nk+1AHcyFjsF98mgpxkalwQfSiLkK2p9YBHYigv/AGwWAbftnY0aAXQ0AE4NLMZLNg59SKa3EJJ3IB7j0oBk0MQsZPqQc0FBiHpgnFR8PQ5BbORVzEtvt9OKqbSXyRpJGw9aCh4y7rpIOO1ESWriEafm42qcMUTgAP5z2NE2zqINJ2JbcHff2/pTUL7aN4nwD5R60Z4IUiWJsDcEfWuyxlH1ImSfmFTjlDqVbsNqEdfLDyHBIwSK6SIkCtIXJ2yeapZ9OcHFdhAY5YYP9aKhcXC25CRjIbtVYBnjLrsM4yaumt2nkzjQq4y1XvCrwKVDYHI4okBxKAccn1ovwWZQUHfn0qgEYycjPpXY5HXbDZ7iimEL+dV4ztitTYMREhI1EelZG1lHirqUAjvncVoenzNGUiBGcAZz3oNR069MbjkEHcVrra4WaFWXnFYmJSFDEhvU+lOukXJikCFsqfWpUaJRiuE7VJcFciosM1Fia7IfepYwBVa8ae1WHkAVUVNjNeqL/NXaAZPMcnsMCrgBtVUK4UZ5O9Sk2FVlmfie5w3hnfPf0rJO+fKgOTz5f80567M5vmDkFAcYNKnXz4IYL7b5ooSRLcjRKhyfRt6HljAGEPB2BORRlwIETBAJ745FCLEiDJGc8Bs0UNJGmC8kmMfwjvSm7bfCnAz+ac3BjCnIJYeuwpdcqMg6Tgj3INF0CkjLyNSjjVzXRcws3nzGw432NeEepvKAu3c0XadHjnSSRlkYLsVxnUTxioBHuoNOAFGO4Neguo+Fdctt5hkVQ3Rb65uzb9PiGUPmwSdPsT/ir7j4P65DHnwi5HmypINT2m4uDlXxVHm2OxI4zVLROjHYaj2pd064urW58C41gq3yt6076EBfdSuo38ynZC3Y96ul6AMpDY5P9qlGdIOM5z2q+4tXjnwecnUBRtvaRBWZwSmjVxuauoCiBaQl8hON6rllVQDI59fMcE/agpOquxMdqACp04I8xNEr8K9WvY1ub5jDG3y6iAQKzeUXEVv0XyOBjtvVgmgl80bfnaq7n4NvYE8S2l8Q4yFO+fpXoelSfpVmmGBx5eVP0pxsvwssWJLltKKPrTawuTE6MVBHpp/zSqOxnRwwPk7nvTe2hkiB3zkZzj+1aRp7GUvCW1E54X0phaSeDMQQeQeaQ2DPhWWTA74YY/FMkdnZQ3mHORRK31lKJLdGA5q5+dqU9Cl1W5X0prnNQSTmugnPvXEOK5zRXjivVJQMcV6oaFjGwqxkJOocY+1RUNpAxV0qPHbtqwds1ph8462f/UZtWM52xSh2wd383Y+lNOq5kvpCoGM/elsluGyWICn15FVVbSqWIUtk7kkVXK+qHG779h/uofp2jbXrOg7mqZ2d/k1IP5gdyKCq5mwh0Jkg/X7UvIndjrBIYfINsUSqSIcBzpJ21jn7DmrWgyurI199HkH4zRSgRyrNoLjUeBj5f908iaSDp7pbvpbTs5G+fWqgvnDeGCByRzn2okSgIHVXK/xgjbipfjUa2xhteh9GZ1QExx62Ztyzc5+prA9f648V9Z33S+uS3Uskeue38PQsB/8Ajxwa0zXS9Q6U9lq0zPGVCkYyO2DXzO06beG7a2Mbh1bSSwO3vXHxyd+xy1tfiK1i6p0aPrEaqlxHh3x/EvfP23+1S+HISH1ABQ4z8u5PqfxVlwjQdLi6dtmQDXtsFA/zt/WqGuj067VYQXjRNJIY7n1FXxbnbXIZdWQa6eY8g5z2qfU4pX6VIsAUPobDYqo38coDjUM8g9q4vUVWCVWcEKCfWuuMFPwj02B+vASBf+PHrKv/ADNtn8Zpj8YdbitPia0W+tv1fT4U1PaCQxiTOxGR+ftXOmpHb3K9Rhl/esuh19RyD/egviq1h61ELiCUJcR7FX21e1ce5z1qzeLvw11dpr24gAaK1dy8KFtXhDOQuTyAMCjrNg0FzNsVeViu2ds1muk28thG8krKsjIV9cD2ouz6rsIwAsYXAJGK3JnLU/MNJAC+VA83ZW2P3phZFtA4b2Pakdu6s+rdhsRvmn9gY33GRj/uK2hjFCUTURkt2A2oiB1j0jw8E9xUosBAWRtNVeJGrkh9+3tRGg6BLiXSSck1pANsViul3DJcKGO/qtay0vFkOgHzDmpQWBtXhsK8p3P1qWDRXhXq6FYj5TXquMqrVWDB2yRwKh1W68OM6hjIxuaKkfyKsY4rJfEvUG1iLbAoM71V0aUgtpGewoArGSNBZieMEVf1I7hgPMw7UrUNGOdu2Tx/ugKKyOAHjyPU/wCKhPC2kqBpB+ZxhmH+K7DNG4AYn6dq68y3B0IjDScaVOM/eqKEgWMeM2onGBqI298VB45m04g1Kd/mwSaL8MA9kzjBySai2hp2C6mY7Ek7fn/FAod3SR1XC52Ydx96CuZSmTl2JxkZzt/bNM7uKZQQfkJ30jGKBWAeYshC4yDmo0r/AFoSNcq69xuSQfrR46wXwscw17AsVGfziktxEwBIbIzvqOfpzVUMrQkklQTxtnFZslva61FwyfpRJK2WI8xJ3O/JpBDcu9zzl98g8fUUHL1KWYukkp0nYYHNFdCUyXImlUlSCAewxVhp3YpmIByxIGDmqp7RMF1JByAfajoXXV5AduRiuahJqABKEenNVNIbaVrO7yxbwvQ9vX/vtT6dLe5twUZVlTgA80uurbWpiwoXP4+lJFedJHimdlYbDttUXXL9r15CI2PherAAn8VZa27d1147YrsQ1yZbDj+pou3QZZkJGORg/wBqIMtEZVBjX2wBx9d6f9PQaQjMBtkrSaBIsBvG+XcqBzTuwvVMRDI3sNgapR7MYlGg6gf4aGBjI1jfUe3Y1SjmQn94c53BHapM2lgEwR60Q06aMzLntR6XDQ3mVYgZ3pd0cksXYHY0RMwaVtjvQbjp3/KjBH5pjHAiEZOc1nvha7Lr4ROAPWtTgb4IJ/tTESwFABC16hnlVG0tkmuUQnuJygyn5rCfEUpMxbO+a21xkxMfSvn/AMQMdUjDjNFVPIslsryP2xgUqkiVpfKjn3O4qzpt0hV4XwW7V25U6QUPmPbTmqKt1BBUj6iqzK8bDEZAHde1d8TQuZCy/wBa5lZT5Hbbmg4l3yrEE9hnirP1kEEOSxLZ7bChp0RACX3zjGNqEkRnXBwR2IqKZG5SRyJJAgccknVigmNuVyshCZxpxlvvUraKJxpYZYcvjcD0rs8UaLqXb0Crjb3opdII99KsUZicOdsfShblA6EiPBPYHNH+AyjWoMZzv5iSK9DZpJc4mnZwckKq+aiA7DpM11oeTQi5308kU6mga0tCFTIQZGOcfSmfTl/dQpDZuFYkEEgEY/iNHXMSDLB9RJA2TYj80kRhY/iEQANAyZY4/ejj7UX+3bndlt4QxGzAnH1xRPWvh+3mSeaO2TUq7slZqPX4mhARhcAD+1UPvh28bqPUGSRi8S+Zm04BOeB606630KO/i8eE6JY+CO9HdC6SbW2jLLGkjAEKVpveTwwQEnMUn/4yKK+aohidg+pSu5AxTKKVGADSsr+21NLzpdpe5ZLtyyDAZsf+aU+BPZyaLk6lPG+c1FMrKCAMsjJ4pzsQchf9mjHlWefU6hFTZPSoWkFubUsF0kA58Jzv/qgnaIoBIr+XgDigZPIAOOO6neuRnWxLHf6UMmllUZbwx2A4o63j1hW0ODndgPKBU0NbDUkHmGx4ogrnGDvS2W4HiiNN8dxxR8DLgALg9yKobdDcR3qjJyTwK3MTAjGCuecisB01v+YgC9+c1voTpjXA7UZrohhXI0535NeqWr2rtEY6/vTFASVOSMCsb1MeOrhsD6U56tcNLdBAxZEO1Jr2PVq0niiso0n6K8EnbODTN3j8NJ1kGltxg8UH1i0Mi6hpG33NC9CvI4mNtcaMAbZ5opg6l/MhGP5Rv/WhmDNlg2Dnn0oy62fSgXH8q1V4LEYOkew23+tCKI1QjMh1Mx7Dc/X0FRnZVbZkwNyc4Fcnt3LA6kwNsA1A2qK4IYsfpQTt5A0wDFsN2ou7yBnI2HmJGw9s0un8VJMldKAZAB3NXo5vIljnZRN2VhhQPegjFDBdq8k92yQp82+B/uiIL61hJjsbd1QZBlAG/wBzXf09oulrmbWikDSFxq965LeeYJ0+x1EnZm8oUDvigMhPVrpE85hAbbCgYX880zVreKJ43nyF80jDcis74MzpJ+rvGJkO514AHoKteW3XLW6swkGhtQ3XFEG3V+W8QQqFhK4U5ByPpWX6eYf2jM7Dyhs4++9FXL+fSpUHHyKefalF9bSwTCVFYIT5lG5oN3B1aZ2/dqrqAAEzimNz1KMwSJc2rsFG+nn7V8/6Z1FW0gtrK8ZOP6VoLO8lUKqymSJhk6wNRPegm0PTL53RPFt5WO5Y6d/91B7SfSYfJKin5gfMv1rszRTs0NzbSRsTnUCNqpdobXMqkxyjYPwWosSdjAq4Kau7Idv+/auWjODqBBC8hjyKqkzLJ4sja3O+QMGroY1mx4ZCkDO/NL0oiPC+YIQjH13Wi5Z2gQfp3Llxg9vyKFZ/02F/duSOzf4qcSlm1HOW59BWPvYItEcLqJGTyKc2h0jcAfU0sjVM87ijreU8BRgdzWw2sCTdLjHNb2BsQLg7gcVhejqHvEIz9DW1jYKmopgD3olExnUoJ2r1KZuqsshWNMqK7U09XzxpCzsT3oWYkgnXpq3Y78GhXlRdQZsH6VQvuVzq9qzPU7WTxWuIdiK087pq9CR3FKroZBHJoPdCv4pBouSEl7Z3pjc27atXzLyd6ydzE0L6lyreoNH9M646YhkOcd2oGwRUbZTjstWxqAwLbH0ArqsrAGOPUx3LZ3qLOFXxJCxxwo9aLELldTlkGSe/pSO8t3t3Exk8KPPzcs3sBT9J4yP36Fc7qG5x9KAvIo7gkvgkb7bhRQBdO6oFJaeHEa8M2+B/k0Y3UIpg7RzaUkxnPO1LLmPJyYwka/KoPb/dULH4zEk6Qdtuw2x/32FA1murRCCMyMu4l5xnmhWuLiTSYRp33PpXIookAXBc5zg849aJhCu+EGEAGVoYlbRaUYtjPODuSe29XYEsKsw8rH78USiIE2IzivKIol3YFdDZ39Ki4Tfs9Um1xjDAmux3JhIVlJZTyKJkuSGLqpKjj1+9VCRJAWI3OMiqixupXUp0qRtzn07VTEkmrXcIWJOealDbGVwVygHB9DRcjCAAOQW9AaCyKTVH8pVe5NW/qHChbbfB3b0+1L/PIxMjFVzsKMikVOQB9DSgtfOAXXLd9PH1o23Axtke9BiQuq+Gv471dbM+cMDSBggVSGCkn1xRkbalyFxnvXLUr4eG78bZolLfWMArUDr4dt2abxC2QKdyztM4t4dhnzNSjpiSx2/hKuNX8Q4pjaSiCIqwKvq3OnNNBscEUa6dOfeu1Bb2NRgRlvcqa9VTt8zuIpD51GF9jQksTYJTLH2p1CFMRyPpWb61NdWTGSB1Cjcg0FR1PkHWvtIM1TKNIwxUe/b7UoHxc+vw2tl1Z5zRCfECzsI5YOfTehEbiFJVKhlcjg6hSK4typKFfDcnYHvWjmSGRNYjG3sBVJtUuEBftxSrSmyvLmywkuok8Ln+taG263bPEstwnh5zjV3pRJbR3BZmzqTlu+BS+/kYSxRsAdJIPpnbiiNckkV55ldW2zvULmAoFS2XyZyx9TWagBto5Z1dvIPKM9ztUP2lewRjw5iV7Bu1CHzQkqQ0eR6motZpgMDpAOdu/tShfiG5LxrIoKg9qu/bNwxzpQYbbaiiv011GGManU+OTwKXyQ3MLjLnLH1op+uT+H8q5xjNDS9QuHzq06jtxwKAgX84Tw1buN8bmurFLLhmdtufpSr9RKrKBp2OaKgmuJ5AniaQT2qGnCRx6dWfLxv3qEjwwOAo1sTwN8elBxws+rXISiHcetXqqxaSqgljnf0qlWi5nlOVAROCMVzVEDlPOfUmhJZmz4ZJwDUPGAYjFEGoxdjsefrRcNscBmIQf/ahraRiQqac6d9S7UWskcTAlS5bjJ/xRYOgKJgBgT6ZxR6bjOAPbPFKBLqYKY02/i70ZEs7uSsoC8bipQ6s2BQYJB7bU0toi2JEAyT5s96z8H6hSXd0JU74GM1rOkxajGm2GwaJWisEH6YAKDtyBzRcMDgFGQHupxzV1nAsR0KdsUYcqowdxvTE0H+ml/lUfeuUeNxn1r1DX//Z',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
        {
          id: 3,
          title: 'Xin sử dụng phòng họp của trường để tổ chức các sự kiện .',
          sender: 'Nguyễn Văn A',
          time: '7 hours ago',
          avatar: 'https://i.pravatar.cc/300',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
        {
          id: 4,
          title: 'Title 2',
          sender: 'Nguyễn',
          time: '5 hours ago',
          avatar: 'https://i.pravatar.cc/301',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        }, 
        {
          id: 5,
          title: 'Xin sử dụng phòng họp của trường để tổ chức các sự kiện .',
          sender: 'Nguyễn Văn A',
          time: '7 hours ago',
          avatar: 'https://i.pravatar.cc/302',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
        {
          id: 6,
          title: 'Title 2',
          sender: 'Nguyễn',
          time: '5 hours ago',
          avatar: 'https://i.pravatar.cc/303',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
        {
          id: 7,
          title: 'Xin sử dụng phòng họp của trường để tổ chức các sự kiện .',
          sender: 'Nguyễn Văn A',
          time: '7 hours ago',
          avatar: 'https://i.pravatar.cc/304',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
        {
          id: 8,
          title: 'Title 2',
          sender: 'Sender Name 2',
          time: '5 hours ago',
          avatar: 'https://i.pravatar.cc/305',
          numOfRes: 3,
          responder: 'Nguyễn Văn B',
        },
      ],
      selectedItem: null,
    };
  },
  methods: {
    selectItem(item){
       this.store.itemDetail = item
    
      this.$router.push({name: 'itemDetail', params: {id: item.id}})
    }
  }
};
</script>
  