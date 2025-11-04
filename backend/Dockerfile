FROM python:3.11-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends libexpat1 && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /root/.local /root/.local

ENV PATH=/root/.local/bin:$PATH
ENV PYTHONPATH=/app/app
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /app
RUN chmod +x /app/*.sh

WORKDIR /app/app
EXPOSE 8001
ENTRYPOINT ["/app/run.sh"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]