import streamlit as st
import pandas as pd
import plotly.express as px
import folium
from folium import Icon
from folium.plugins import MarkerCluster
from streamlit_folium import st_folium

# --------------------------
# 1. 데이터 로딩 및 전처리 함수
# --------------------------
def preprocess(df):
    columns_to_use = ["요양기관명", "종별코드명", "시도코드명", "시군구코드", "시군구코드명", "주소", "좌표(X)", "좌표(Y)"]
    df = df[columns_to_use]
    df = df.rename(columns={
        "좌표(X)": "경도",
        "좌표(Y)": "위도"
    })
    df = df.dropna(subset=["경도", "위도"])
    return df

@st.cache_data
def load_data():
    df = pd.read_csv("Hospital Data Status.csv", encoding='utf-8')
    return preprocess(df)

# --------------------------
# 2. Streamlit 앱 구성
# --------------------------
st.title("🏥 병원 정보 시각화 대시보드")
st.markdown("""
이 대시보드는 한국의 병원 데이터를 시각화합니다.  
왼쪽의 필터를 사용하여 특정 지역 또는 병원 종류를 선택하세요.  
파일 업로드를 통해 다른 데이터셋도 사용할 수 있습니다.
""")

# --------------------------
# 3. 파일 업로드 섹션
# --------------------------
uploaded_file = st.sidebar.file_uploader("CSV 파일 업로드", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file, encoding='utf-8')
    df = preprocess(df)
    st.sidebar.success("파일 업로드 완료!")
else:
    df = load_data()
    st.sidebar.info("기본 데이터 사용 중입니다.")

# --------------------------
# 4. 사이드바 필터
# --------------------------
st.sidebar.header("🔎 필터 옵션")

selected_region = st.sidebar.selectbox("시도 선택", ["전체"] + sorted(df["시도코드명"].unique()))

if selected_region != "전체":
    districts = sorted(df[df["시도코드명"] == selected_region]["시군구코드명"].unique())
    selected_district = st.sidebar.selectbox("시군구 선택", ["전체"] + districts)
else:
    selected_district = "전체"

selected_type = st.sidebar.selectbox("병원 종류 선택", ["전체"] + sorted(df["종별코드명"].unique()))

# --------------------------
# 5. 데이터 필터링 함수
# --------------------------
def filter_data(df, region, district, h_type):
    temp_df = df.copy()
    if region != "전체":
        temp_df = temp_df[temp_df["시도코드명"] == region]
    if district != "전체":
        temp_df = temp_df[temp_df["시군구코드명"] == district]
    if h_type != "전체":
        temp_df = temp_df[temp_df["종별코드명"] == h_type]
    return temp_df

filtered_df = filter_data(df, selected_region, selected_district, selected_type)

# --------------------------
# 6. 탭 구성
# --------------------------
tab1, tab2, tab3 = st.tabs(["🏥 병원 수", "📊 병원 종류 분포", "🗺️ 병원 위치 지도"])

# --------------------------
# 7. 병원 수 탭
# --------------------------
with tab1:
    st.metric(label="병원 수", value=len(filtered_df))
    st.dataframe(filtered_df)

# --------------------------
# 8. 병원 종류 분포 탭
# --------------------------
with tab2:
    st.subheader("병원 종류별 분포")

    if selected_district != "전체":
        data_for_plot = df[
            (df["시도코드명"] == selected_region) &
            (df["시군구코드명"] == selected_district)
        ]
    elif selected_region != "전체":
        data_for_plot = df[df["시도코드명"] == selected_region]
    else:
        data_for_plot = df

    if selected_type != "전체":
        data_for_plot = data_for_plot[data_for_plot["종별코드명"] == selected_type]

    title_text = "전체 병원 종류별 수"
    if selected_region != "전체" and selected_district != "전체":
        title_text = f"{selected_region} {selected_district} 내 병원 종류별 수"
    elif selected_region != "전체":
        title_text = f"{selected_region} 내 병원 종류별 수"
    if selected_type != "전체":
        title_text += f" (종류: {selected_type})"

    type_counts = data_for_plot["종별코드명"].value_counts().reset_index()
    type_counts.columns = ["병원종류", "병원수"]

    total_hospitals = type_counts["병원수"].sum()
    st.write(f"### 총 {selected_type} 수: {total_hospitals}개")

    fig_bar = px.bar(
        type_counts,
        x="병원종류",
        y="병원수",
        color="병원종류",
        title=title_text
    )
    fig_bar.update_layout(
        legend_itemclick=False,
        legend_itemdoubleclick=False
    )
    st.plotly_chart(fig_bar)


# --------------------------
# 9. 병원 위치 지도 탭
# --------------------------
with tab3:
    st.subheader("병원 위치 지도")

    region_centers = {
        "서울특별시": [37.5665, 126.9780],
        "부산광역시": [35.1796, 129.0756],
        "대구광역시": [35.8714, 128.6014],
        "인천광역시": [37.4563, 126.7052],
        "광주광역시": [35.1595, 126.8526],
        "대전광역시": [36.3504, 127.3845],
        "울산광역시": [35.5384, 129.3114],
        "세종특별자치시": [36.4801, 127.2891],
        "경기도": [37.4138, 127.5183],
        "강원특별자치도": [37.8228, 128.1555],
        "충청북도": [36.6358, 127.4913],
        "충청남도": [36.5184, 126.8000],
        "전라북도": [35.7175, 127.1530],
        "전라남도": [34.8161, 126.4629],
        "경상북도": [36.4919, 128.8889],
        "경상남도": [35.4606, 128.2132],
        "제주특별자치도": [33.4996, 126.5312]
    }

    if selected_region != "전체" and selected_region in region_centers:
        map_center = region_centers[selected_region]
        zoom_level = 10
    else:
        map_center = [37.5665, 126.9780]
        zoom_level = 7

    m = folium.Map(location=map_center, zoom_start=zoom_level)
    marker_cluster = MarkerCluster().add_to(m)

    for _, row in filtered_df.iterrows():
        color = "blue"
        if row["종별코드명"] == "종합병원":
            color = "red"
        elif row["종별코드명"] == "한방병원":
            color = "green"

        folium.Marker(
            location=[row["위도"], row["경도"]],
            popup=f"""<div style='white-space: nowrap;'>
                        <b>{row['요양기관명']}</b>&nbsp;&nbsp;<br>&nbsp;&nbsp;{row['주소']}
                     </div>""",
            icon=Icon(color=color)
        ).add_to(marker_cluster)


    st_folium(m, width=700, height=500)