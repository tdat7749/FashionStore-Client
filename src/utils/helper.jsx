export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});



export const stringToSlug = (title) => {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    // slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    // slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    // slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    // slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    // slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    // slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    // slug = slug.replace(/đ/gi, 'd');
    // //Xóa các ký tự đặt biệt
    // slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // //Đổi khoảng trắng thành ký tự gạch ngang
    // slug = slug.replace(/ /gi, "-");
    // //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    // //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    // slug = slug.replace(/\-\-\-\-\-/gi, '-');
    // slug = slug.replace(/\-\-\-\-/gi, '-');
    // slug = slug.replace(/\-\-\-/gi, '-');
    // slug = slug.replace(/\-\-/gi, '-');
    // //Xóa các ký tự gạch ngang ở đầu và cuối
    // slug = '@' + slug + '@';
    // slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}


export const MenuItem = [
    {
        title: 'Trang Chủ',
        path: '/'
    },
    {
        title: 'Sản Phẩm',
        path: '/san-pham'
    },
    {
        title: 'Khuyến Mại',
        path: '/'
    },
    {
        title: 'Tin Tức',
        path: '/'
    },
    {
        title: 'Tuyển Dụng',
        path: '/'
    },
    {
        title: 'Giỏ Hàng',
        path: '/gio-hang'
    }
]

export const BASE_IMAGE_URL = "https://localhost:7000/upload-image/"
export const BASE_API_URL = "https://localhost:7000/api/"


export const news = [
    {
        thumbnail: 'https://360boutique.vn/wp-content/themes/360boutique/thumb.php?src=https://360boutique.vn/wp-content/uploads/2023/02/328694391_899380944442666_7868373078296893203_n.jpg&w=400&h=250&zc=1&q=90',
        createdAt: '15/02/2023',
        title: 'Thử Thách Mùa Yêu "Yêu" - 100% Nhận Quà',
    },
    {
        thumbnail: 'https://360boutique.vn/wp-content/themes/360boutique/thumb.php?src=https://360boutique.vn/wp-content/uploads/2023/01/DEMO-WINDOW.gif&w=400&h=250&zc=1&q=90',
        createdAt: '11/01/2023',
        title: 'Đón Xuân Sang - Lên Đồ Tết | UP TO 50%',
    },
    {
        thumbnail: 'https://360boutique.vn/wp-content/themes/360boutique/thumb.php?src=https://icdn.dantri.com.vn/2022/12/28/dao-xuong-pho-1672191841695.jpg&w=400&h=250&zc=1&q=90',
        createdAt: '29/12/2022',
        title: 'Không Khí Lạnh Bao Trùm, Miền Bắc Rét Đậm',
    }
]



export const orderStatus = [
    {
        title: 'Đang Xử Lý',
        value: 0
    },
    {
        title: 'Đã Xử Lý',
        value: 1
    },
    {
        title: 'Đang Vận Chuyển',
        value: 2
    },
    {
        title: 'Đã Vận Chuyển',
        value: 3
    },
    {
        title: 'Đã Hủy',
        value: 4
    },
]